# Simple FAQ bot

## Recommended Software Requirement

- NodeJS 16.x [🔗](https://nodejs.org/en/download/)
- npm 8.x

## Available Scripts

### `npm install`

- To download and install require dependencies

### `npm run dev`

- Runs the app in the development mode.
- Open [http://127.0.0.1:3000](http://127.0.0.1:3000) with your browser to see the result.
- The page will reload if you make changes.
- You will also see any lint errors in the console.

### `npm run build`

- Builds the app for production to the `.next` folder.
- The build is minified and optimized. Ready to be deployed.

### `npm start`

- To start the previous build run.
- The app will be available at [http://127.0.0.1:3000/](http://127.0.0.1:3000/).
- Check console for any additional information.

## API Endpoints

```
Body: {
    idx ( Type: Number )    
    Que ( Type: String )
    Ans ( Type: String )
}
```

- [GET /api](http://localhost:3000/api)
- [GET /api?idx=:idx](http://localhost:3000/api?idx=)
- [POST /api](http://localhost:3000/api)
- [PUT /api?id=:id](http://localhost:3000/api?id=)
- [DELETE /api?id=:id](http://localhost:3000/api?id=)
- [COPY /api](http://localhost:3000/api)
- [PURGE /api](http://localhost:3000/api)

<br />

&copy;2021 [Nyi Nyi Htun](https://github.com/nyintosh/)
