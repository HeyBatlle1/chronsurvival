import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  doc, 
  updateDoc,
  orderBy,
  limit,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
  getDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { InjuryData } from '../types';

const BATCH_SIZE = 20;

export async function saveAssessment(userId: string, assessment: InjuryData) {
  try {
    const docRef = await addDoc(collection(db, 'assessments'), {
      ...assessment,
      userId,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving assessment:', error);
    throw new Error('Failed to save assessment');
  }
}

export async function getUserAssessments(
  userId: string,
  lastDoc?: QueryDocumentSnapshot<DocumentData>
) {
  try {
    let q = query(
      collection(db, 'assessments'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(BATCH_SIZE)
    );

    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const querySnapshot = await getDocs(q);
    const assessments = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as InjuryData[];

    return {
      assessments,
      lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
      hasMore: querySnapshot.docs.length === BATCH_SIZE
    };
  } catch (error) {
    console.error('Error getting assessments:', error);
    throw new Error('Failed to get assessments');
  }
}

export async function updateAssessment(assessmentId: string, data: Partial<InjuryData>) {
  try {
    const assessmentRef = doc(db, 'assessments', assessmentId);
    await updateDoc(assessmentRef, {
      ...data,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating assessment:', error);
    throw new Error('Failed to update assessment');
  }
}

export async function getAssessmentById(assessmentId: string) {
  try {
    const docRef = doc(db, 'assessments', assessmentId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error('Assessment not found');
    }

    return {
      id: docSnap.id,
      ...docSnap.data()
    } as InjuryData;
  } catch (error) {
    console.error('Error getting assessment:', error);
    throw new Error('Failed to get assessment');
  }
}