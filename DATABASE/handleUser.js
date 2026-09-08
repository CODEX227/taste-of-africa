import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification} from "firebase/auth"
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

async function sendV(user) {
    await sendEmailVerification(user.user);
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

function GetData_Customer(callback, errorCallback, uid) {
    const refs = {
        OngoingPends: ref(db, `OngoingPends/${uid}`),
        cart: ref(db, `cart/${uid}`),
        orders: ref(db, `orders/${uid}`),
        users: ref(db, `users/${uid}`),
        food: ref(db, `food`),
        web: ref(db, `web`),
        coupons : ref(db, `coupons`),
        GeneralNotifications : ref(db, `GeneralNotifications`)
    };
    console.log(uid)
    const data = {};
    const loaded = new Set();

    const unsubscribers = Object.entries(refs).map(([key, reference]) =>
        onValue(
            reference,
            (snapshot) => {
                data[key] = snapshot.val();
                loaded.add(key);

                if (loaded.size === Object.keys(refs).length) {
                    callback({ ...data });
                }
            },
            errorCallback
        )
    );

    return () => {
        unsubscribers.forEach(unsubscribe => unsubscribe());
    };
}

async function adddata(userUid, useremail, username) {
    const snapshot = await set(ref(db, `users/${userUid}`), {
        Uid : userUid,
        name : username,
        email : useremail,
        delCount : 10,
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
    const snapshot = await remove(ref(db, `users/${userUid}/notification/${notId}`))
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
    const snapshot = await update(ref(db, `OngoingPends/`), {[userUid]: orderid})
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

async function dissableAccount(uid){
     await auth.updateUser(uid, {
        disabled: true
    });
}

async function editFoodDetails(foodid, newD){
    const snapshot = await update(ref(db, `food/foodlisting/${foodid}`), newD)
}

async function editfoodImg(foodid, imgSrc){
    const snapshot = await update(ref(db, `food/foodlisting/${foodid}`), imgSrc)
}

async function AddNewItem(ItemID, ItemData){
    const snapshot = await update(ref(db, `food/foodlisting/${ItemID}`), ItemData)
}

async function disableFood(foodid, disable){
    const snapshot = await update(ref(db, `food/foodlisting/${foodid}`), disable)
}

async function pushNotification(uid, data, notsID){
    const snapshot = await update(ref(db, `users/${uid}/notification/${notsID}`), data)
}

async function updateOrderStatus( orderid, uid, newStatus){
    const snapshot = await update(ref(db, `ADMINBLOCK/USERORDERS/${orderid}`), {orderStatus : newStatus}).then(() => {
    FinalOrderResult(uid, orderid, {status : newStatus})
    })
}

async function AppendCoupon(CID, data){
    const snapshot = await update(ref(db, `coupons/${CID}`), data)
}

async function DeleteCoupon(CID){
    const snapshot = await remove(ref(db, `coupons/${CID}`))
}

async function AppendGNots(data, notsID){
    const snapshot = await update(ref(db, `GeneralNotifications/${notsID}`), data)
}

async function DelGNots(notsID){
    const snapshot = await remove(ref(db, `GeneralNotifications/${notsID}`))
}

async function UsedCoupons(uid, CID){
    const snapshot = await update(ref(db, `users/${uid}/UsedCoupons`), {[Math.random().toString(36).slice(2, 8)] : CID})
}

async function UpdateDcount(uid, newCount){
    const snapshot = await update(ref(db, `users/${uid}`), newCount).then(() => {
    })
}

async function Append_P_Sales(data){
    const snapshot = await update(ref(db, `ADMINBLOCK/P_SALES`), {[Math.random().toString(36).slice(2, 12)] : data})
}
export {
           signin,
           signup,
           sendV,
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
           editfoodImg,
           AddNewItem,
           disableFood,
           dissableAccount,
           pushNotification,
           updateOrderStatus,
           AppendCoupon,
           DeleteCoupon,
           AppendGNots,
           DelGNots,
           UpdateDcount,
           UsedCoupons,
           Append_P_Sales,
           GetData_Customer
        };