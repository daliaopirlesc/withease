import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import { ProfileSetupScreen, GoalsSetupScreen } from '../screens/ProfileSetupScreen';
import HomeScreen from '../screens/HomeScreen';
import LogMoodScreen from '../screens/LogMoodScreen';
import InsightsScreen from '../screens/InsightsScreen';
import {DiscoverScreen, BreatheRelaxScreen, GratitudeJournalScreen, EveningWindDownScreen, FocusBoosterScreen, StressJournalScreen, BodyScanMeditationScreen, CalmBreakScreen, GuidedMeditationScreen, MindfulCheckInScreen, MotivationalChallengesScreen, ProductivityPlannerScreen, ReflectAndGrowScreen } from '../screens/DiscoverScreen';
import ProfileScreen from '../screens/ProfileScreen';



const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">

      

        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />

          <Stack.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ headerShown: false }} 
        />


        <Stack.Screen 
          name="Discover" 
          component={DiscoverScreen} 
          options={{ headerShown: false }} 
        />
         <Stack.Screen 
          name="BodyScanMeditation" 
          component={BodyScanMeditationScreen} 
          options={{ headerShown: false }} 
        />
          <Stack.Screen 
          name="MotivationalChallenges" 
          component={MotivationalChallengesScreen} 
          options={{ headerShown: false }} 
        />
        
        <Stack.Screen 
          name="MindfulCheckIn" 
          component={MindfulCheckInScreen} 
          options={{ headerShown: false }} 
        />
         <Stack.Screen 
          name="ReflectAndGrow" 
          component={ReflectAndGrowScreen} 
          options={{ headerShown: false }} 
        />



        <Stack.Screen 
          name="CalmBreak" 
          component={CalmBreakScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="GuidedMeditation" 
          component={GuidedMeditationScreen} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen 
          name="StressJournal" 
          component={StressJournalScreen} 
          options={{ headerShown: false }} 
        />
         <Stack.Screen 
          name="FocusBooster" 
          component={FocusBoosterScreen} 
          options={{ headerShown: false }} 
        />
         <Stack.Screen 
          name="BreatheRelax" 
          component={BreatheRelaxScreen} 
          options={{ headerShown: false }} 
        />
          <Stack.Screen 
          name="GratitudeJournal" 
          component={GratitudeJournalScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="EveningWindDown" 
          component={EveningWindDownScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ProductivityPlanner" 
          component={ProductivityPlannerScreen} 
          options={{ headerShown: false }} 
        />


         <Stack.Screen 
          name="Insights" 
          component={InsightsScreen} 
          options={{ headerShown: false }} 
        />
           <Stack.Screen 
          name="LogMood" 
          component={LogMoodScreen} 
          options={{ headerShown: false }} 
        />




        <Stack.Screen 
          name="ProfileSetup" 
          component={ProfileSetupScreen} 
          options={{ headerShown: false }} 
        />
         <Stack.Screen 
          name="GoalsSetup" 
          component={GoalsSetupScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Onboarding" 
          component={OnboardingScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="SignIn" 
          component={SignInScreen} 
          options={{ title: 'Sign In' }} 
          
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen} 
          options={{ title: 'Sign Up' }} 
        />
        <Stack.Screen 
          name="ForgotPassword" 
          component={ForgotPasswordScreen} 
          options={{ title: 'Forgot Password' }} 
        />
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
