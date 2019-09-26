import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import AppIcon from "../images/monkey.png";
import {Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import {connect} from 'react-redux';
import {signupUser} from "../redux/actions/userActions";

const styles = {
    typography: {
        useNextVariants: true
    },
    form: {
        textAlign: 'center'
    },
    pageTitle: {
        margin: '20px auto 20px auto'
    },
    image: {
        margin: '10px auto 10px auto'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        marginTop: 20,
        position: 'relative'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    progress: {
        position: 'absolute'
    }
};

class signup extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            loading: false,
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.UI.errors) {
            this.setState({errors: nextProps.UI.errors});
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });

        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle,
        };

        this.props.loginUser(newUserData, this.props.history);
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    };


    render() {
        const {classes, UI: {loading}} = this.props;
        const {errors} = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} className={classes.image} alt="monkey"/>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Signup
                    </Typography>
                    <form className={classes.container} noValidate onSubmit={this.handleSubmit} autoComplete="off">
                        <TextField
                            id="email"
                            label="Email"
                            type="email"
                            name="email"
                            className={classes.textField}
                            helperText={errors.email}
                            error={!!errors.email}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            name="password"
                            className={classes.textField}
                            helperText={errors.password}
                            error={!!errors.password}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth
                        />

                        <TextField
                            id="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            className={classes.textField}
                            helperText={errors.confirmPassword}
                            error={!!errors.confirmPassword}
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            fullWidth
                        />

                        <TextField
                            id="handle"
                            label="Handle"
                            type="text"
                            name="handle"
                            className={classes.textField}
                            helperText={errors.handle}
                            error={!!errors.handle}
                            value={this.state.handle}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button type="submit" variant="contained" color="primary"
                                className={classes.button} disabled={loading}>
                            Signup {loading && (
                            <CircularProgress size={30} className={classes.progress}/>
                        )}
                        </Button>
                        <br/>
                        <small>Already have an account? Login <Link to='/login'>here</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        );
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    signupUser
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(signup));
