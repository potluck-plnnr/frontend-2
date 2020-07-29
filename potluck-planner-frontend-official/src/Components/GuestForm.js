import React, {useState, useEffect} from "react";
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useForm, Controller} from 'react-hook-form';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Icon from '@material-ui/core/Icon';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    avatar: {
      backgroundColor: red[500],
    },
    root: {
      maxWidth: 345,
    },
}));


export default function GuestForm(props) {

    const classes = useStyles();

    const {
        register,
        handleSubmit,
        control,
        errors,
        watch,
        formState: {
            isSubmitting
        }
    } = useForm();


    

    const [potluck, setPotluck] = useState([]);
    const [indexes, setIndexes] = useState([]);
    const [query, setQuery] = useState('');
    const [expanded, setExpanded] = useState(false);
    const [item, setItem] = React.useState({
      appetizers: false,
      entrees: false,
      dessert: false,
      utensils: false,
    
    });
    
    
      const handleChange = (event) => {
        setItem({
            ...item,
            [event.target.name]: event.target.checked
        });
    };

    useEffect(()=>{
      axios
      .get("https://backend-bw.herokuapp.com/potlucks")
      .then(res=>{
        // console.log('this is res', res);
        const potlucks = res.data.filter(potluck=>
          potluck.name.toLowerCase().includes(query.toLowerCase())
          );
          // console.log('potlucks', res)
          setPotluck(potlucks);
      });
    }, [query])
    


    const handleInputChange = event => {
      setQuery(event.target.value);
    };

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const onSubmit = (data) => {
      console.log(data.item);
    };

    


    return (

        <Container component="main" maxWidth="xs">

            <CssBaseline/>
            <div className={
                classes.paper
            }>
                
              
                
                
                
                <Typography component="h1" variant="h5">
                    Which potluck are you attending?
                </Typography>
                <form className={
                        classes.form
                    }
                    onSubmit={
                        handleSubmit((data) => alert(JSON.stringify(data)))
                }>

                    <TextField variant="outlined" margin="normal"
                        inputRef={register}
                        fullWidth
                        id="search"
                        type='text'
                        label="Search by event name"
                        name="name"
                        className="prompt search-name"
                        onChange={handleInputChange}
                        value={query}
                        name="name"
                        tabIndex="0"
                        autoFocus/>

     
                    <div className="potluck"
                      
                   >
                            {potluck.map(data => {
                              const potluckName = {data}
                              console.log(potluckName);
                              return (
                             
                                <Card className={classes.root}>
                                <CardHeader
                                  // avatar={
                                  //   <Avatar aria-label="recipe" className={classes.avatar}>
                                  //     R
                                  //   </Avatar>
                                  // }
                                  // action={
                                  //   <IconButton aria-label="settings">
                                  //     <MoreVertIcon />
                                  //   </IconButton>
                                  // }
                                  title={data.name}
                                  subheader={data.date}
                                  
                                />
                                <CardContent>
                                  <Typography variant="body2" color="textSecondary" component="p">
                                    {data.time}
                                  </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                  <IconButton
                                    className={clsx(classes.expand, {
                                      [classes.expandOpen]: expanded,
                                    })}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                  >
                                    Click here if attending <ExpandMoreIcon />
                                  </IconButton>
                                </CardActions>
                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                                            <TextField variant="outlined" margin="normal"
                                                      inputRef={register}
                                                      required
                                                      fullWidth
                                                      id="name"
                                                      type='text'
                                                      label="name"
                                                      name="name"
                                                      className="name"
                                                      name="name"
                                                      tabIndex="0"
                                                      autoFocus/>

                                                        <FormControl 
                                                            inputRef={register}
                                                            required
                                                            component="fieldset"
                                                            className={
                                                                classes.formControl
                                                        }>
                                                            <label>What are you bringing?</label>
                                                          <Controller
                                                            as={
                                                              <RadioGroup aria-label="item">
                                                                <FormControlLabel
                                                                  value="appetizers"
                                                                  control={<Radio />}
                                                                  label="Appetizers"
                                                                />
                                                                <FormControlLabel
                                                                  value="entrees"
                                                                  control={<Radio />}
                                                                  label="Entrees"
                                                                />
                                                                  <FormControlLabel
                                                                  value="desserts"
                                                                  control={<Radio />}
                                                                  label="Desserts"
                                                                />
                                                                  <FormControlLabel
                                                                  value="utensils"
                                                                  control={<Radio />}
                                                                  label="Utensils"
                                                                />
                                                              </RadioGroup>
                                                            }
                                                            name="itemBringing"
                                                            control={control}
                                                          />
                                                        </FormControl>



                                                      <Button type="submit" fullWidth variant="contained" color="primary"
                                                        className={
                                                            classes.submit
                                                      }>
                                                        Submit
                                                      </Button>

                                                          
  </form>
                              </Collapse>
                          </Card>
        );
  })}
</div>

                                                        

 </form>
            </div>
        </Container>
    )
}
