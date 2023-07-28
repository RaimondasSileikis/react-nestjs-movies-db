import { ServerErrorResponse } from '../interfaces';

export default function ActionDataError ({ error }: {error : ServerErrorResponse} ) {
  const errorStatus = error?.response?.data?.statusCode;
  const errorMessage = [error?.response?.data?.message]
    .flat()
    .map((message, i) => (
      <li key={i}>{message}</li>
    ));

  if (!error) {
    return null;
  }

  return (
    <div className="flow container grid" >
      <h3>Errors: {errorMessage}</h3>
      <h2>Status - {errorStatus}</h2>
    </div>
  );
}
