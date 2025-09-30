'use server';

import { z } from 'zod';
import { db, isFirebaseConfigValid } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';

const FormSchema = z.object({
  email: z.string().email({ message: "유효한 이메일을 입력해주세요." }),
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

  // Firebase 설정이 완전하지 않을 때 처리
  if (!isFirebaseConfigValid() || !db) {
    return {
      success: false,
      errors: {
        email: ["Firebase 설정이 완료되지 않았습니다. 관리자에게 문의하세요."],
      },
    };
  }

  try {
    const subscriptionsRef = collection(db, 'subscriptions');

    // 중복 체크를 건너뛰고 바로 추가 (권한 문제 해결을 위해)
    console.log("Adding email to Firestore:", email);

    const docRef = await addDoc(subscriptionsRef, {
      email: email,
      subscribedAt: serverTimestamp(),
    });

    console.log("Document written with ID: ", docRef.id);
    return { success: true };
  } catch (e) {
    console.error("Error adding document: ", e);
    console.error("Error code:", e.code);
    console.error("Error message:", e.message);

    if (e.code === 'permission-denied') {
      return {
        success: false,
        errors: {
          email: ["데이터베이스 권한이 없습니다. Firestore 규칙을 확인해주세요."],
        },
      };
    }

    return {
      success: false,
      errors: {
        email: ["예상치 못한 오류가 발생했습니다. 다시 시도해주세요."],
      },
    };
  }
}
