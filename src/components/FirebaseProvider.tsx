import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInAnonymously, User } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface ThemePreference {
  primaryColor: string;
  secondaryColor: string;
  bgType: 'default' | 'gradient' | 'image' | 'glass';
  fontFamily: string;
  isDark: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  theme: ThemePreference;
  updateTheme: (newTheme: Partial<ThemePreference>) => Promise<void>;
}

const defaultTheme: ThemePreference = {
  primaryColor: '#1877f2', // Geometric Balance Blue
  secondaryColor: '#42b72a', // Facebook Green
  bgType: 'default',
  fontFamily: 'Inter, sans-serif',
  isDark: false,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<ThemePreference>(defaultTheme);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        // Load theme from Firestore
        const themeRef = doc(db, 'themes', user.uid);
        const themeSnap = await getDoc(themeRef);
        
        if (themeSnap.exists()) {
          setTheme(themeSnap.data() as ThemePreference);
        } else {
          // Initialize default theme in Firestore
          await setDoc(themeRef, { ...defaultTheme, updatedAt: new Date().toISOString() });
        }

        // Subscribe to theme changes
        const themeUnsub = onSnapshot(themeRef, (doc) => {
          if (doc.exists()) {
            setTheme(doc.data() as ThemePreference);
          }
        });

        return () => themeUnsub();
      } else {
        setUser(null);
        // Automaticaly sign in anonymously to save current theme preferences
        signInAnonymously(auth).catch((err) => console.error("Anonymous sign in failed", err));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateTheme = async (newTheme: Partial<ThemePreference>) => {
    if (!user) return;
    const themeRef = doc(db, 'themes', user.uid);
    const updatedTheme = { ...theme, ...newTheme, updatedAt: new Date().toISOString() };
    setTheme(updatedTheme); // Optimistic update
    try {
      await setDoc(themeRef, updatedTheme);
    } catch (error) {
      console.error("Failed to update theme", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, theme, updateTheme }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a FirebaseProvider');
  }
  return context;
};
