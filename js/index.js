var auth=firebase.auth();
var firestore=firebase.firestore();
let signInFrom=document.querySelector(".signInFrom")
let signUpFrom=document.querySelector(".signUpFrom")
let googleSign=document.querySelector(".googleSign")

let signInFormSubmission=async(e)=>
{
    e.preventDefault();
    try {

        let email=document.querySelector(".signInEmail").value;
        let password=document.querySelector(".signInPassword").value;
        if(email && password)
        {
            let {user:{uid}}=await auth.signInWithEmailAndPassword(email,password)
    
            let userInfo=await firestore.collection("user").doc(uid).get();
            location.assign(`dashboard.html#${uid}`)
        }


    } catch (error) {
        console.log(error.message)
    }

}

var googleSignInFunction=async()=>
{
    try {
        var googleProvider = new firebase.auth.GoogleAuthProvider();
        let {user:{uid,displayName,email},additionalUserInfo:{isNewUser}}=await firebase.auth().signInWithPopup(googleProvider); 
        


        if(isNewUser)
        {
            let userInfo=
            {
                displayName,
                email,
                createdAt:new Date(),
            }

            await firestore.collection("user").doc(uid).set(userInfo)
            location.assign(`dashboard.html#${uid}`)
        }
        else{
            location.assign(`dashboard.html#${uid}`)
        }

    } catch (error) {
        console.log(error.message)
    }
}



let signUpFormSubmission=async(e)=>
{
    e.preventDefault();
    try {
        let name=document.querySelector(".signUpName").value;
        let email=document.querySelector(".signUpEmail").value;
        let password=document.querySelector(".signUpPassword").value;
        if(name && email && password)
        {
           let {user:{uid}}= await auth.createUserWithEmailAndPassword(email,password)
            let userInfo={
                displayName:name,
                email:email,
                createdAt:new Date()
            }

            await firestore.collection("user").doc(uid).set(userInfo);
            location.assign(`dashboard.html#${uid}`)


        }
    } catch (error) {
        console.log(error.message)
    }

}

signUpFrom.addEventListener("submit",(e)=>signUpFormSubmission(e))
signInFrom.addEventListener("submit",(e)=>signInFormSubmission(e))
googleSign.addEventListener("click",googleSignInFunction)

