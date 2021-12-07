// App.jsx
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { YoutuberDetail } from "./components/YoutuberDetail";
import { YoutuberList } from "./components/YoutuberList";
import { CreateYoutuber } from "./components/CreateYoutuber";
import { Edit } from "./components/Edit";
import { Login } from "./components/page/Login";
import { AuthProvider } from "./contexts/Auth";
import { Signup } from "./components/page/Signup";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={YoutuberList} />
          <Route exact path="/post/:id" component={YoutuberDetail} />
          <Route exact path="/create" component={CreateYoutuber} />
          <Route path="/edit/:id" component={Edit} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};
export default App;
