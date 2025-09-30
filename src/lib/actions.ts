'use server';

import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';

const FormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
});

export type SubscriptionResponse = {
  success: boolean;
  errors?: {
    email?: string[];
  };
};

export async function subscribeToNewsletter(email: string): Promise<SubscriptionResponse> {
  const parsed = FormSchema.safeParse({ email });

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const subscriptionsRef = collection(db, 'subscriptions');
    const q = query(subscriptionsRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return {
        success: false,
        errors: { email: ["This email is already subscribed."] },
      };
    }

    await addDoc(subscriptionsRef, {
      email: email,
      subscribedAt: serverTimestamp(),
    });
    
    return { success: true };
  } catch (e) {
    console.error("Error adding document: ", e);
    return {
      success: false,
      errors: {
        email: ["An unexpected error occurred. Please try again."],
      },
    };
  }
}
