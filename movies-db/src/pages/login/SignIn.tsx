import { 
    useLoaderData, 
    Form, 
    redirect, 
    useActionData, 
    useNavigation 
} from 'react-router-dom';
import { login } from '../../api';
import { ServerErrorResponse } from '../../interfaces';
import ActionDataError from '../../components/ActionDataError';

export async function loader({ request }: { request: Request }) {
    return new URL(request.url).searchParams.get('message');
}

export async function action({ request }: { request: Request }) {
    const loginFormData = await request.formData();
    const email = (loginFormData.get('email') ?? '') as string;
    const password = (loginFormData.get('password') ?? '') as string;
    const redirectTo = new URL(request.url).searchParams.get('redirectTo');
    const pathname = redirectTo ?? '/';
    try {
        const data = await login({
            email,
            password
        });
        localStorage.setItem('user', data.email);
        localStorage.setItem('accessToken', data.acces_token);
        const expirationTime = new Date().getTime() + 7200000;
        localStorage.setItem('accessTokenExpiration', expirationTime.toString());
        return redirect(pathname);
    } catch(err) {
        console.error(err);
        return err;
    };
}

export default function SignIn() {
    const navigation = useNavigation();
    const loginState = navigation.state;
    const authError = useLoaderData() as string;
    const actionDataError = useActionData() as ServerErrorResponse;

    return(
        <div className="flow container grid grid-items-center">
            { authError && <h3>{authError}</h3>}
            <Form 
                className="grid"
                replace 
                method="post"
            >
                <input name="email" 
                       type="email" 
                       placeholder="Email address"
                />
                <input name="password" 
                       type="password" 
                       placeholder="Password"
                />
             <button 
                className="text-white bg-green" 
                disabled={ loginState === 'submitting' } >
                    { loginState === 'submitting' ? 'Login...' : 'Sign In'}
             </button>
            </Form>
            {actionDataError && (
                <ActionDataError error={actionDataError} />
            )}
        </div>
    );
}
