<div align="center">
	<br />
	<p>
		<a href="https://github.com/abdooo9/google-oauth2"><img src="https://miro.medium.com/max/1200/1*5XrmcupeUuAUvbGMqGxxDw.png" width="500" alt="Google OAuth2 With Node.js" /></a>
	</p>
	<br/>

</div>

# [Google OAuth2 With Node.js](https://github.com/abdooo9/google-oauth2)

<br/>

## Installation

1. ``
git clone https://github.com/abdooo9/google-oauth2.git
``
2. [Create new project with](https://console.cloud.google.com/projectcreate) Google Cloud Platform

    ![Create new project](https://image.prntscr.com/image/4mgh0WtoRVCrY4N3bi1WMg.png)

3. Click on [Create CREDENTIALS](https://console.cloud.google.com/apis/credentials) 
4. Click on [OAuth client ID](https://console.cloud.google.com/apis/credentials/oauthclient)  

    ![Create CREDENTIALS](https://image.prntscr.com/image/0NvZuZnmRvCeAg8d2P9_xw.png)

    - If you got this page

        ![Configure consent screen](https://image.prntscr.com/image/8hu_dv5RQ9Sojr7zYfV8_Q.png)
        - **you need to [Configure consent screen](https://console.cloud.google.com/apis/credentials/consent)**

        ![Configure consent screen](https://image.prntscr.com/image/ad7WbPg7SAyll1IgnvWyOg.png)
        - Click `save`

        ![Configure consent screen](https://image.prntscr.com/image/dDYktdjxTQqnzOzgY_SPDw.png)
        - Click `save`

        ![Configure consent screen](https://image.prntscr.com/image/jtqBBBSsSsKwCAWdY-kmRA.png)
        - Click `save`

        - Back to [Credentials page](https://console.cloud.google.com/apis/credentials) again

        - Repeat 3.4 steps

5.  Create OAuth client ID 

    - Type your app name
    - Type your Authorized redirect URIs, I typed `http://localhost:5000/callback`
    - Click create button

    ![Create OAuth client ID](https://image.prntscr.com/image/vZrW3u9CTYO5D7Yh6XJK8g.png)

    - Copy client id, client secret to clipboard

        ![client id, client secret](https://image.prntscr.com/image/2WeIrA2eTXWu7cukoNmw-A.png)

6. Now we need modification environments

    - change `.env.example` file name to `.env`
    - Type your CLINET_ID and CLIENT_SECRET in `.env` file after equal sign

7. Run App
    - Type `npm i` in your command line 
    - Type `node server.js`

    App is work!

<br>
