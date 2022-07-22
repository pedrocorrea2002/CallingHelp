//^ DTO: Data Transfer Object
//^ Usado para separar a tipagem daquilo que vai ser entregue pelo Firestore

import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type OrderFirestoreDTO = {
    patrimony: string;
    description: string;
    status: 'open' | 'closed';
    solution?: string;
    created_at: FirebaseFirestoreTypes.Timestamp;
    closed_at?: FirebaseFirestoreTypes.Timestamp;
    userOpener: string;
    userCloser?: string;
    openerEmail: string;
}