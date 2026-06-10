import { supabase } from '@/lib/supabase'

export async function signUpWithEmail(email: string, password: string, username: string) {
    return supabase.auth.signUp({
        email,
        password,
        options: {
            data: { username },
            emailRedirectTo: `${window.location.origin}/onboarding`
        }
    })
}

export async function signInWithEmail(email: string, password: string) {
    return supabase.auth.signInWithPassword({ email, password })
}

export async function signInWithGoogle() {
    return supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/onboarding` }
    })
}

export async function signInWithGitHub() {
    return supabase.auth.signInWithOAuth({
        provider: 'github',
        options: { redirectTo: `${window.location.origin}/onboarding` }
    })
}