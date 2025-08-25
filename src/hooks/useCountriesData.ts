import {
  collection,
  CollectionReference,
  type FirestoreDataConverter
} from 'firebase/firestore';
import type { Country } from '../types/countryTypes';
import { db } from '../services/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { arrayShuffle } from '../utils/helpers';

const countryConverter: FirestoreDataConverter<Country> = {
  toFirestore: (country: Country) => country,
  fromFirestore: (snapshot) => snapshot.data() as Country
};

export interface QuestionType {
  name: string;
  flag: { svg: string; png: string; alt: string };
  answers: Country[] | undefined;
}

export const useCountriesData = () => {
  const countriesRef: CollectionReference<Country> = collection(
    db,
    'countries'
  ).withConverter(countryConverter);

  const [countries] = useCollectionData<Country>(countriesRef);

  const createQuestions = (number: number) => {
    if (!countries) return;

    const mainCountries = arrayShuffle(countries).slice(0, number);

    const questions: QuestionType[] = [];

    mainCountries.forEach((country) => {
      let answers = countries.filter((current) => current !== country);
      answers = arrayShuffle(answers).slice(0, 3);
      answers.push(country);

      questions.push({
        ...country,
        answers: answers.sort(() => 0.5 - Math.random())
      });
    });

    return questions;
  };

  return {
    createQuestions
  };
};
