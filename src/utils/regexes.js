export default {
  regexUsername: /^[a-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ\s]{3,20}$/i,
  regexCorrectAnswer: /^[0-3]$/,
  regexId: /^[0-9a-f]{24}$/,
  regexQuizTitle: /^[a-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ\s]{4,70}$/i,
  regexQuestionText: /^[a-z0-9'żźćńółęąśŻŹĆĄŚĘŁÓŃ\s]{1,100}$/i,
  regexQuestionAnswer: /^[a-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ\s]{1,70}$/i,
  regexQuestionNumber: /^[0-9]+$/,
}
