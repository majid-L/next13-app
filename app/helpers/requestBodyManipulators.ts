export const ignoreEmptyFields = (examDetails: ExamDetails) => {
  return Object.entries(examDetails)
  .filter(([field, value]) => value.length > 0 && !/^\s+$/.test(value));
}

export const formatRequestBody = (userInput: ExamDetails, existingObject: Exam) => {
  const validatedInput = ignoreEmptyFields(userInput);
  const body: Record<string, string> = {};
  validatedInput.forEach(([field, value]) => {
    body[field] = value;
  });

  const requestFields: string[] = validatedInput.map(kvp => kvp[0]);

  if (requestFields.includes('date') && requestFields.includes('time')) {
    body.date = `${userInput.date} ${userInput.time}`;
  } else if (requestFields.includes('date') && !requestFields.includes('time')) {
    body.date = `${userInput.date} ${existingObject.date.slice(11)}`;
  } else if (!requestFields.includes('date') && requestFields.includes('time')) {
    body.date = `${existingObject.date.slice(0, 10)} ${userInput.time}`;
  }

  return body;
}