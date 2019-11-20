import React from 'react';




import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Pregunta from '../preguntas/Pregunta';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ['First', 'Second', 'Third'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return    <div>
                <Pregunta></Pregunta>
            </div>
    case 1:
      return 'An ad group contains one or more ads which target a shared set of keywords.';
    case 2:
      return      <div>
        <h2>Hey</h2>
        <h3>Ypu</h3>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate velit, quo fuga cumque inventore commodi non dolore accusamus aspernatur sapiente nisi at exercitationem, repellendus minima. Rem id repellat aut quis!
        </p>
        <div className="form-inline ">

            <div className="custom-control custom-radio mx-3">
                <input type="radio" id="customRadio1" name="customRadio" className="custom-control-input"/>
                <label className="custom-control-label" htmlFor="customRadio1">100%</label>
            </div>
            <div className="custom-control custom-radio mx-3">
                <input type="radio" id="customRadio2" name="customRadio" className="custom-control-input"/>
                <label className="custom-control-label" htmlFor="customRadio2">75%</label>
            </div>
            <div className="custom-control custom-radio mx-3">
                <input type="radio" id="customRadio3" name="customRadio" className="custom-control-input"/>
                <label className="custom-control-label" htmlFor="customRadio3">50%</label>
            </div>
            <div className="custom-control custom-radio mx-3">
                <input type="radio" id="customRadio4" name="customRadio" className="custom-control-input"/>
                <label className="custom-control-label" htmlFor="customRadio4">25%</label>
            </div>
        </div>
        </div>;
    default:
      return 'Unknown step';
  }
}

export default function VerticalLinearStepper(props) {

  var evaluacion = props.Evaluacion
  var stepsList = []
  var preguntasList = []

  if(evaluacion)
  {
    evaluacion.secciones.map((seccion, index)=>{
      stepsList.push(seccion.NombreSeccion)
      seccion.preguntas.map((pregunta, index)=> {
        preguntasList.push(pregunta)
        // stepsList.push(pregunta.tituloPregunta)
      })

    })

  }

  
  const classes = useStyles({});
  const [activeStep, setActiveStep] = React.useState(0);
  // const steps = getSteps();
  const steps = stepsList;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="">
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
            {/* <div>{getStepContent(index)}</div> */}
            <div>
                <Pregunta Pregunta={preguntasList[index]}></Pregunta>
            </div>
              {/* <Typography>{getStepContent(index)}</Typography> */}
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}