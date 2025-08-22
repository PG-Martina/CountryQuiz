import fetch from 'node-fetch';
import { readFile } from 'fs/promises';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

async function seed() {
  const json = await readFile(
    new URL('./serviceAccountKey.json', import.meta.url),
    'utf-8'
  );
  const serviceAccount = JSON.parse(json);

  initializeApp({ credential: cert(serviceAccount) });
  const db = getFirestore();

  const res = await fetch(
    'https://restcountries.com/v3.1/all?fields=name,flags,cca3'
  );
  const data = await res.json();

  const batch = db.batch();
  data.forEach((item) => {
    const ref = db.collection('countries').doc(item.cca3);
    batch.set(ref, {
      name: item.name.common,
      flag: {
        svg: item.flags.svg,
        png: item.flags.png,
        alt: item.flags.alt ?? ''
      }
    });
  });

  await batch.commit();
  console.log('Firestore populated');
}

seed().catch(console.error);
