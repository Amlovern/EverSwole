import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import jujiPic from '../../assets/juji-split.jpg';
import workoutPic from '../../assets/workout-pic.jpg';
import './Landing.css';

const LandingPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const loggedUser = useSelector(state => state.session.user);

    return (
        <div>
            <div className='landing-header'>
                <h2>Tame your workouts, organize your gains</h2>
                <h4>Lift everything and tackle any goals you have with your exercises and workouts all in one place.</h4>
                {loggedUser ?
                null
                :
                <div className='landing-login'>
                    <button onClick={() => history.push('/signup')}>Sign up for free</button>
                    <Link className='landing-login-link' to='/login'
                    style={{
                        color: "black"
                    }}
                    >Already have an account? Log in</Link>
                </div>
                }
            </div>
            <div className='landing-hooks'>
                <img src={workoutPic}/>
                <div className='landing-hook-p'>
                    <p>WORKOUT ANYWHERE</p>
                    <p>Keep important workouts handy.</p>
                    <p>REMEMBER EVERYTHING</p>
                    <p>Create an exercise for each workout you do.</p>
                    <p>TURN GOALS INTO REALITY</p>
                    <p>Bring your exercises and workouts together to bring the gains.</p>
                </div>
            </div>
            <div className='landing-bottom'>
                <h4>Find your workout happy place</h4>
                <p>Get swole with EverSwole</p>
                <img src={jujiPic} />
            </div>
        </div>
    );
};

export default LandingPage;
