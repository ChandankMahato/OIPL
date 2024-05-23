import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../Config/Firebase/config";
import { toast } from "react-toastify";

export function getCurrentDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
}

export async function handleImageSubmit(imageFile, setImageFile, setImageDownloadURL, folderName) {
  const fileRef = ref(storage, `${folderName}/${imageFile.name}`);
  if (imageFile !== null) {
    try {
      await uploadBytes( fileRef, imageFile);
      setImageDownloadURL(await getDownloadURL(fileRef));
      toast.success("Image Uploaded Successfully");
      setImageFile(null);
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  } else {
    toast.warning("Image Not Selected");
  }
}

export function handleImageChange(event, setImageFile) {
  const selectedImage = event.target.files[0];
  setImageFile(selectedImage);
}

export function handleURLCopy(imageDownloadURL, setCopyURL) {
  if (imageDownloadURL === "") {
    toast.info("Could not find Image URL");
  } else {
    const tempInput = document.createElement("input");
    tempInput.value = imageDownloadURL;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    toast.success("Image URL copied to clipboard!");
    setCopyURL(true);
    setTimeout(() => {
      setCopyURL(false);
    }, 3000);
  }
}

export async function handleLogOut(logOut) {
    try{
      await logOut();
      toast.success("Signed Out Successfully")
    }catch(error){
      toast.error("Error Signing Out")
    }
  }

export async function handleSignIn(googleSignIn) {
    try {
      await googleSignIn();
      toast.success("Signed In Successfully");
    } catch (error) {
      if (error.message === "no_internet_connection") {
        toast.error("No Internet Connection.");
      } else {
        toast.error("Error Signing In.");
      }
    }
};

export function extractUsername(email) {
  const regexWithNumber = /^(.*?)(\d+)(?=\@)/; 
  const regexWithoutNumber = /^(.*?)\@/;

  let username = "";

  if (regexWithNumber.test(email)) {
    const matches = email.match(regexWithNumber);
    if (matches && matches.length >= 2) {
      username = matches[1];
    }
  } else if (regexWithoutNumber.test(email)) {
    const matches = email.match(regexWithoutNumber);
    if (matches && matches.length >= 2) {
      username = matches[1];
    }
  }

  return username;
}



export function calculateLocalStorageSize() {
  let totalBytes = 0;

  for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
          totalBytes += (localStorage[key].length + key.length) * 2; // Estimate size in bytes
      }
  }

  return totalBytes;
}