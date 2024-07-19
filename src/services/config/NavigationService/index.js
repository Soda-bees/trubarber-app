import { NavigationActions } from "@react-navigation/native"

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function navigate(routeName) {
    _navigator.navigate(routeName);
}

function goBack() {
    _navigator.dispatch(NavigationActions.back());
}


export default {
    navigate,
    setTopLevelNavigator,
    goBack,
};