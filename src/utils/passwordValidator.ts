import zxcvbn from "zxcvbn";

export function strongPasswordValidator(password: string): boolean {
  const result = zxcvbn(password);
  return result.score >= 3;
}

export function passwordFeedback(password: string) {
  const result = zxcvbn(password);
  return {
    score: result.score,
    warning: result.feedback.warning,
    suggestions: result.feedback.suggestions,
  };
}

export function passwordCrackTime(password: string) {
  const result = zxcvbn(password);
  return {
    timeInSeconds: result.crack_times_seconds,
    timeDisplay: result.crack_times_display,
  };
}

export function validatePasswordStrength(password: string) {
  const result = zxcvbn(password);

  if (result.score < 3) {
    return {
      valid: false,
      feedback: result.feedback.suggestions,
      warning: result.feedback.warning,
    };
  }

  return {
    valid: true,
    feedback: ["Strong password"],
    warning: "",
  };
}
