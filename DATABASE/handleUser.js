import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth"
import { getDatabase, ref, set, onValue, remove, update } from "firebase/database"

    const firebaseConfig = {
        apiKey: "AIzaSyBoNcs4B43gKr0oZLJA1ZjdQG_TQYFNL3g",
        authDomain: "taste-of-africa-39ce6.firebaseapp.com",
        databaseURL: "https://taste-of-africa-39ce6-default-rtdb.firebaseio.com",
        projectId: "taste-of-africa-39ce6",
        storageBucket: "taste-of-africa-39ce6.firebasestorage.app",
        messagingSenderId: "478350628322",
        appId: "1:478350628322:web:74c7ee074a6cc59633d5bb",
        measurementId: "G-10YVVZJNCX"
};
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const auth = getAuth(app)
const name = 'qnmxixxc'
const api = '937172562342591'

async function signup(email, password) {
    const createuser =  createUserWithEmailAndPassword(auth, email, password)
    return createuser
}

async function signin(email, password) {
    const getuser = signInWithEmailAndPassword(auth, email, password)
    return getuser
}

async function signout() {
    const closeuser = signOut(auth)
}

function getdata(callback, errorCallback) {
    const dataref = ref(db);

    const unsubscribe = onValue(
        dataref,
        (snapshot) => {
            callback(snapshot.val());
        },
        (error) => {
            errorCallback(error);
        }
    );

    return unsubscribe;
}

async function adddata(userUid, useremail, username) {
    const snapshot = await set(ref(db, `users/${userUid}`), {
        Uid : userUid,
        name : username,
        email : useremail,
        role: "customer",
        profile: {
            location : "",
            profileImgSrc : 'https://res.cloudinary.com/qnmxixxc/image/upload/v1785656554/fjzvgckzwdkpmbyvqgyi.png'
        }
    })
}

async function addreservation(userUid, data){
    const snapshot = await set(ref(db, `reservations/${userUid}`), data)
}

async function addcart(userUid, data, cartid){
    const snapshot = await set(ref(db, `cart/${userUid}/${cartid}`), data)
}

async function  removecart(userUid, cartid) {
    const snapshot = await remove(ref(db, `cart/${userUid}/${cartid}`))
}

async function inc(userUid, newQ, cartid) {
    const snapshot = await update(ref(db, `cart/${userUid}/${cartid}`),newQ)
}

async function dec(userUid, newQ, cartid) {
    const snapshot = await update(ref(db, `cart/${userUid}/${cartid}`),newQ)
}

async function delNots(userUid, notId){
    const snapshot = await remove(ref(db, `notification/${userUid}/${notId}`))
}

async function clearcart(userUid) {
    const snapshot = await remove(ref(db, `cart/${userUid}`))
}

async function AddAppends(userUid, cartid, appended, category){
    const snapshot = await update(ref(db, `cart/${userUid}/${cartid}/customized/${category}`), appended)
}

async function addProfile(userUid, url){
    const snapshot = await update(ref(db, `users/${userUid}/profile`), url)
}

async function delinformation(userUid, addinfo){
    const snapshot = await update(ref(db, `users/${userUid}/delivery`), addinfo)
}

async function addorder(userUid, data, orderid){
    const snapshot = await set(ref(db, `orders/${userUid}/${orderid}`), data)
}

async function OngoingPends(userUid, orderid){
    const snapshot = await set(ref(db, `OngoingPends/`), {[userUid]: orderid})
}

async function FinalOrderResult(userUid, OngoingPendID, Updates) {
    const snapshot = await update(ref(db, `orders/${userUid}/${OngoingPendID}/`),Updates)
}

async function DeleteOngoingPends(userUid){
    const snapshot = await remove(ref(db, `OngoingPends/${userUid}`))
}

async function AppendAdminOrder(id, data){
    const snapshot = await set(ref(db, `ADMINBLOCK/USERORDERS/${id}`), data)
}

async function dissableAccount(){
    
}

async function editFoodDetails(foodid, newD){
    const snapshot = await update(ref(db, `food/foodlisting/${foodid}`), newD)
}

async function editfoodImg(foodid, imgSrc){
    const snapshot = await update(ref(db, `food/foodlisting/${foodid}`), imgSrc)
}
 
export {
           signin,
           signup,
           signout,
           getdata,
           auth,
           adddata,
           addreservation,
           addcart,
           removecart,
           inc,
           delNots,
           dec, 
           clearcart,
           AddAppends,
           addProfile,
           delinformation,
           addorder,
           OngoingPends,
           FinalOrderResult,
           DeleteOngoingPends,
           AppendAdminOrder,
           editFoodDetails,
           editfoodImg
        };