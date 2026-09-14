interface ErrorMessageProps {
  error?: unknown;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  return <div>{(error as Error)?.message}</div>;
}
