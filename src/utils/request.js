import axios from 'axios';

export default{

    readJson(){
        axios.get("citydata.json").then((res) => {
            const result = res.data.cityid
            this.mapProvince(result);
        })
    }

}