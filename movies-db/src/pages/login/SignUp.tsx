import { 
  Form, 
  useActionData, 
  redirect
} from "react-router-dom";
import { createUser } from '../../api';
import ActionDataError from '../../components/ActionDataError';
import { ServerErrorResponse } from '../../interfaces';

export async function action({ request }: { request: Request }) {
    const userFormData = await request.formData();
    const firstName = (userFormData.get('firstname') ?? '') as string;
    const lastName = (userFormData.get('lastname') ?? '') as string;
    const email = (userFormData.get('email') ?? '') as string;
    const password = (userFormData.get('password') ?? '') as string;

    try {
      await createUser({
        firstName,
        lastName,
        email,
        password,
    });
      return redirect('/signin');
    } catch (err) {
      console.error(err);
      return err;
    }
};

export default function SignUp() {
  const actionDataError = useActionData() as ServerErrorResponse;

  return(
    <div className="flex container grid grid-items-center">
      <Form 
        className="grid"
        replace
        method="post"
      >
        <input name="firstname" 
              type="text" 
              placeholder="First name"
        />
        <input name="lastname" 
              type="text" 
              placeholder="Last name"
        />
        <input name="email" 
              type="email" 
              placeholder="Email address"
        />
        <input name="password" 
              type="password" 
              placeholder="Password"
        />
        <button className="bg-green text-white" >
          Sign Up
          </button>
      </Form>
      {actionDataError && (
        <ActionDataError error={actionDataError} />
      )}
    </div>
  );
}
