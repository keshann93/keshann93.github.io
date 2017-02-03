---
title:  "Redux Simplified"
categories:
  - Web
tags:
  - React
---

[Flux](https://facebook.github.io/flux/) is a pattern proposed by facebook to build ReactJS applications. Flux is not a library but a pattern like MVC. Flux mandates an uni-directional data flow.

A typical flux implementation has three components.

1. **Action** : 'Action' represents a certain action that the application can perform. For example, a bookmark application can allow users to 'Add a boomark'. So 'Add a bookmark' is an action.

2. **Dispatcher** : A dispatcher is a component which dispatches the actions to the store.

3. **Store** : Store holds the state. The store handles various actions and changes the state based on handling these actions. In typical flux implementation, we could have multiple stores in an application.

![FluxImplementation.PNG](https://raw.githubusercontent.com/Raathigesh/Raathigesh.github.io/master/_posts/FluxImplementation.PNG)

### Redux
Redux is a flux library which helps to manage application state in JavaScript applications. Even though  it's mostly used with ReactJS, it's a framework agnostic solution for JavaScript state management. This post aims to introduce redux concepts with a very minimalistic example.

Three fundamental parts of Redux

1. The State
2. Actions
3. Reducers

> Redux uses only a single store

> Redux doesn't have a dispatcher component

#### The State
Redux maintains the application state in a single state object. This state object could store information related to the application such as who is the current logged in user or it could store information related to the UI state such as a state of a UI element. For example, an expandable element is expanded or collapsed.

But why? For example, when you build web applications, multiple components are interested in a piece of information. For example, whether the user is authorized or not. So a global state is an ideal way to store such information so each individual UI components can access.

> Redux maintains state in a single atom (Single object)

<figure>
	<a href="https://raw.githubusercontent.com/Raathigesh/Raathigesh.github.io/master/_posts/SingleState.PNG"><img src="https://raw.githubusercontent.com/Raathigesh/Raathigesh.github.io/master/_posts/SingleState.PNG"></a>
	<figcaption>Sample redux state, a single object.</figcaption>
</figure>

#### Actions
User interface can trigger actions. When an action is triggered, it could change the application state.

An action in Redux has two properties, the type of the action and the data required to change the state. Type of the action is a string value. But this value should be unique among all the actions. Two actions can't have the same type.

An Example redux action. The type of the below action is 'SET_AUTHORIZE' and the data is 'true'.

{% highlight javascript %}
{
	type: 'SET_AUTHORIZE',
 	data: true
}
{% endhighlight %}

##### Action Creator
Action Creator is a place an action is created. Action creator is simply a function which returns an action object. SetAuthorization() is an action creator which creates the 'SET_AUTHORIZE' action.

{% highlight javascript %}
function SetAuthorization() {
	return  {
		type: 'SET_AUTHORIZE',
		data: true
	}
}
{% endhighlight %}

#### Reducers
So far we have a state and actions with the information on how to change the state. But who is going to change the state? Reducer is.

Despite the fancy name, Reducer is just another function with a switch case.

But the very important part is, a reducer is responsible for managing a branch of your global state. If we go back to our previous global state, we need two reducers to manage this state as follows.

- App Reducer - To manage the state.app branch or sub state
- User Reducer - To manage the state.user branch or sub state

<figure>
	<a href="https://raw.githubusercontent.com/Raathigesh/Raathigesh.github.io/master/_posts/SingleState.PNG"><img src="https://raw.githubusercontent.com/Raathigesh/Raathigesh.github.io/master/_posts/SingleState.PNG"></a>
	<figcaption>Sample redux state, a single object.</figcaption>
</figure>

**Each reducer will have it's initial state.** This initial state is the part of the global state or sub-state they are responsible of managing.

So how a reducer would look like ? Let's look at the App Reducer which can handle the 'SET_AUTHORIZE' action.

{% highlight javascript %}
const initialStateOfAppReducer = {
	name: 'My Awesome Application',
	version: '1.0',
	authorized: false
}

export default function appReducer(state = initialStateOfAppReducer, action) {
  switch (action.type) {
    case 'SET_AUTHORIZE':
      return Object.assign({}, state, { authorized: action.data });
    default:
      return state;
  }
}
{% endhighlight %}

You might ask what's `Object.assign({}, state, { authorized: action.data });` is all about. We can't we just do `state.authorized = action.data`?

Well, We can't because doing `state.authorized = action.data`? is directly mutating the state which is not recommended. What we should be doing is returning a new state itself which is what `Object.assign({}, state, { authorized: action.data });` does.

#### Container Component

##### React Dump component
A dump React component doesn't really care about from where it's getting its data from. A dump component accepts everything through props.

##### React Smart Component
A container component is also known as a smart component. A container component provides the information needed for the dump components.

##### Redux Container Component
A redux container component connects the dump components with actions and the central state. To do this redux has a 'connect' method. This connection method accepts two function which tells how to map the actions and state to the dump component.
{% highlight javascript %}
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home'; // Dump home component
import { SetAuthorization } from '../actions/actions';

function mapStateToProps(state) {
  return {
    name: state.app.name
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    SetAuthorization: SetAuthorization
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
{% endhighlight %}

### In Summary
Redux is an opinionated flux implementation and widely adopted by the react community. Redux helps to develop easily maintainable large scale react applications. [Redux video tutorials created by the master mastermind behind redux, Dan Abramov, is a great place to start.](https://egghead.io/series/getting-started-with-redux)

### Repository With Sample
You could also check out this [Github repository](https://github.com/Raathigesh/CodeLib/tree/master/ReduxSimplified) which has a very minimal React/Redux sample.
