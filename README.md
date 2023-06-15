# Seven-CentreForMindfulness
# Feature

- Prepare for Vietnamese version
1. **Login/Register**

The primary features of the application are as follows:

1. User authentication through email, Google, and Facebook login methods.
2. User information is stored in a Firestore database with the following fields:
    - **`email`**: a unique string that serves as the user's identifier.
    - **`name`**: a string representing the user's name.
    - **`avatar`**: a string representing the user's avatar image URL. This field is automatically generated upon registration and can be changed later.
    - **`gender`**: an enumeration representing the user's gender, with values of "M", "F", or "O".
    - **`age`**: an integer representing the user's age.
3. Validation input
4. The application supports a "forgot password" feature.
5. FireAuth is used for implementing most authentication functionalities.
6. The application's user interface (UI) will guide the user through the sign up and sign out processes.
7. User information will be automatically stored in the Firestore database for all types of logins.

In addition to the primary features, the application includes the following secondary features:

1. An OTP will be sent for verification.
2. The application includes an option for users to remain logged in ("remember me").
3. Animation effects are incorporated into the UI.
4. Sound effects are incorporated into the UI.

---

![Screenshot 2023-05-14 at 19.01.48.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/68580949-0e2e-4403-9a91-65ece0cbd58d/Screenshot_2023-05-14_at_19.01.48.png)

![Screenshot 2023-05-14 at 19.02.35.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ce3daf23-ede5-4cc5-b349-986c012e7387/Screenshot_2023-05-14_at_19.02.35.png)

1. **Self-assessment**

attribute to store in firebase of `User model`:

`evaluation_points : int`

`has_evaluate: boolean`

`adhd_severe: enum(low,medium,high)`

All ADHD on the market is like this

For every 3 screens, there are quotes

There might be a speed test to answer some questions if 10 questions but the client only answered below 3 they might get ADHD

![Screenshot_20230501-082519.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4f621f97-306e-4c58-aed8-f1691e8671be/Screenshot_20230501-082519.png)

![Screenshot_20230501-082557.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/dc0e6dbd-4ff6-4b1a-9777-d8c201929696/Screenshot_20230501-082557.png)

1. T**raining and activity ( client will give to us )**

![Screenshot 2023-05-22 at 20.52.10.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f2a05b99-1873-44c0-ad8e-adccc568fbc9/Screenshot_2023-05-22_at_20.52.10.png)

1. **Report**
- Exercise set: user chooses exercise/activities
- List of fun facts, short articles to read
- List of suggested songs to stay focused
- Tip of the day
- You surpass 60% of people today

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f698bbb1-2d96-4c86-871d-0b6fffdb98be/Untitled.png)
