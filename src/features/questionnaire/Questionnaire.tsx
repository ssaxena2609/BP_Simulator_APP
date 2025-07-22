import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Paper, Typography, RadioGroup, Radio, FormControl, FormControlLabel, Box, FormLabel,
  Button
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import surveyJson from '../../data/survey.json';

const questions = surveyJson.survey.questions;

export default function Questionnaire() {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const {t } = useTranslation();

  const visibleQuestions = useMemo(() => {
    return questions.filter(q => {
      if (!q.preCondition) return true;
      const pre = q.preCondition;
      return answers[pre.questionId] === pre.value;
    });
  }, [answers]);

  const currentQuestion = visibleQuestions[currentIndex];

  const handleAnswer = (value: string) => {
    const updatedAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(updatedAnswers);
    if (currentIndex < visibleQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate('/results', { state: { answers: updatedAnswers } });
    }
  };

  if (!currentQuestion) return null;

  const getTranslation = (key: string, defaultValue?: string) => {
    const translation = t(key, { defaultValue });
    return translation === key ? defaultValue : translation;
  };

  return (
    <>
      <Box component="header" sx={{ textAlign: 'center', mt: 4 }} role="heading" aria-level={1}>
        <Typography variant="h4" component="h1">
          {t('survey.title')}
        </Typography>
      </Box>
      <Container component="main" maxWidth="sm" sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper elevation={3} sx={{ width: '100%', padding: 4, borderRadius: 2 }}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel id="question-label" sx={{ fontSize: 20, marginBottom: 2 }}>
              {getTranslation(
                `survey.${currentQuestion.id}.question`, 
                currentQuestion.question
              )}
            </FormLabel>
            {currentQuestion.type === 'single_choice' && (
              <RadioGroup
                aria-labelledby="question-label"
                name={`question-${currentQuestion.id}`}
                onChange={(e) => handleAnswer(e.target.value)}
                value={answers[currentQuestion.id] || ''}
              >
                {currentQuestion.options.map(opt => (
                  <FormControlLabel
                    key={opt.value}
                    value={opt.value}
                    control={
                      <Radio 
                        inputProps={{
                          'aria-label': getTranslation(
                            `survey.${currentQuestion.id}.options.${opt.value}`,
                            opt.label
                          )
                        }}
                      />
                    }
                    label={getTranslation(
                      `survey.${currentQuestion.id}.options.${opt.value}`,
                      opt.label
                    )}
                  />
                ))}
              </RadioGroup>
            )}
          </FormControl>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
            >
              {t('buttons.back')}
            </Button>
            <Button
              variant="contained"
              onClick={() => handleAnswer(answers[currentQuestion.id] || '')}
              disabled={!answers[currentQuestion.id]}
            >
              {currentIndex === visibleQuestions.length - 1 ? t('buttons.submit') : t('buttons.next')}
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
