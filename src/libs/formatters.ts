export const formatResponse = <T>({
  data,
  message,
  statusText,
  statusCode,
}: {
  data?: T;
  message?: string;
  statusText?: string;
  statusCode?: number;
}) => {
  return Response.json({ data, message }, { status: statusCode, statusText });
};
