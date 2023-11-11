import axios from "axios";
import { toast } from "react-toastify";
export const getCatores = async(props) => {
await axios.get('http://localhost:8000/get-categories')
    .then((result) => {
        if (result.data.state) {
            props.setCatogres(result.data.categories);
        } else {
            toast.error("اسم الستخدم موجود بالفعل")

        }
    })
    .catch(err => console.log(err))
}