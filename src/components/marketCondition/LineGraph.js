import React from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import {useState, useEffect } from "react";
import axios from 'axios';
import {cloudServerIP} from "../../App"

let options = {
    spanGaps: true,
};

const style4 = {
    display: "flex",
    lineHeight: "90px",
    marginLeft: "40px",
    marginTop: "20px",
    fontSize: "25px",
    fontWeight: "700",
};

function LineGraph(props){
    let [status,setStatus] = useState(" ");
    let [data,setData] = useState({
        labels: null,
        datasets: [null
            // {
            //     type: 'line',
            //     label: 'Dataset 1',
            //     borderColor: 'rgb(54, 162, 235)',
            //     borderWidth: 2,
            //     data: null,
            // },
            // {
            //     type: 'line',
            //     label: 'Dataset 2',
            //     borderColor: 'rgb(75, 192, 192)',
            //     borderWidth: 2,
            //     data: null,
            // },
        ],
    })

    useEffect(() => {
        let arr = null;
        let tempArr1 = [];
        let tempArr2 = [{
            type: 'line',
            label: '소매 시세 ',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 2,
            data: [],
        }];
        let tempArr3 = [{
            type: 'line',
            label: '도매 시세 ',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 2,
            data: [],
        }];
        
        console.log(props);

        if(props.data[0] == "일간-소매"){
            axios
                .get(cloudServerIP + "/api/wholesale-and-retail/day/retail",
                {
                    params: {
                    start: props.data[2][0],
                    end: props.data[2][1],
                    kindGradeId: props.data[1],
                    },
                    withCredentials: true
                },)
                .then((res) => {
                    setStatus(res.data.data.item[res.data.data.item.length-1].itemname + ">>" 
                    + res.data.data.item[res.data.data.item.length-1].kindname);
                    arr = res.data.data.item.filter((i) => i.countyname == "평균");
                    for(let i = 0; i < arr.length; i++){
                        tempArr1 = tempArr1.concat(arr[i].yyyy + "/" + arr[i].regday);
                        tempArr2[0].data = tempArr2[0].data.concat(arr[i].price.replace(/,/gi,""));
                    }
                    console.log(tempArr2);
                    setData({"labels":tempArr1, "datasets":tempArr2,});
                })
                .catch((err) => {console.log(err); alert("해당 품목의 소매 정보가 없습니다.");});
        }
        else if(props.data[0] == "일간-도매"){
            axios
                .get(cloudServerIP + "/api/wholesale-and-retail/day/wholesale",
                {
                    params: {
                        start: props.data[2][0],
                        end: props.data[2][1],
                        kindGradeId: props.data[1],
                    },
                    withCredentials: true 
                },)
                .then((res) => {
                    setStatus(res.data.data.item[res.data.data.item.length-1].itemname + ">>" 
                    + res.data.data.item[res.data.data.item.length-1].kindname);
                    arr = res.data.data.item.filter((i) => i.countyname == "평균");
                    for(let i = 0; i < arr.length; i++){
                        tempArr1 = tempArr1.concat(arr[i].yyyy + "/" + arr[i].regday);
                        tempArr3[0].data = tempArr3[0].data.concat(arr[i].price.replace(/,/gi,""));
                    }
                    console.log(tempArr3);
                    setData({"labels":tempArr1, "datasets":tempArr3,});
                })
                .catch((err) => {console.log(err); alert("해당 품목의 도매 정보가 없습니다.");});
        }
        else if(props.data[0] == "월간-소매"){
            axios
                .get(cloudServerIP + "/api/wholesale-and-retail/monthly",
                {
                    params: {
                        year: props.data[2],
                        kindGradeId: props.data[1],
                    },
                    withCredentials: true
                },)
                .then((res) => {
                    console.log(res);
                    arr = res.data.price[1].item[3];
                    console.log(arr);
                    for(let i = 1; i <= 12; i++){
                        tempArr1 = tempArr1.concat(i);
                    }
                    tempArr2[0].data = 
                        tempArr2[0].data.concat(
                            arr.m1.replace(/,/gi,""),
                            arr.m2.replace(/,/gi,""),
                            arr.m3.replace(/,/gi,""),
                            arr.m4.replace(/,/gi,""),
                            arr.m5.replace(/,/gi,""),
                            arr.m6.replace(/,/gi,""),
                            arr.m7.replace(/,/gi,""),
                            arr.m8.replace(/,/gi,""),
                            arr.m9.replace(/,/gi,""),
                            arr.m10.replace(/,/gi,""),
                            arr.m11.replace(/,/gi,""),
                            arr.m12.replace(/,/gi,"")
                        );
                    setStatus(res.data.price[1].caption);
                    console.log(tempArr2);
                    console.log(status);
                    setData({"labels":tempArr1, "datasets":tempArr2, });
                })
                .catch((err) => {console.log(err); alert("해당 품목의 소매 정보가 없습니다.");});
        }
        else if(props.data[0] == "월간-도매"){
            axios
                .get(cloudServerIP + "/api/wholesale-and-retail/monthly",
                {
                    params: {
                    year: props.data[2],
                    kindGradeId: props.data[1],
                    },
                    withCredentials: true
                },)
                .then((res) => {
                    console.log(res);
                    arr = res.data.price[0].item[3];
                    console.log(arr);
                    for(let i = 1; i <= 12; i++){
                        tempArr1 = tempArr1.concat(i);
                    }
                    tempArr3[0].data = 
                        tempArr3[0].data.concat(
                            arr.m1.replace(/,/gi,""),
                            arr.m2.replace(/,/gi,""),
                            arr.m3.replace(/,/gi,""),
                            arr.m4.replace(/,/gi,""),
                            arr.m5.replace(/,/gi,""),
                            arr.m6.replace(/,/gi,""),
                            arr.m7.replace(/,/gi,""),
                            arr.m8.replace(/,/gi,""),
                            arr.m9.replace(/,/gi,""),
                            arr.m10.replace(/,/gi,""),
                            arr.m11.replace(/,/gi,""),
                            arr.m12.replace(/,/gi,"")
                        );
                    setStatus(res.data.price[0].caption);
                    console.log(tempArr3);
                    setData({"labels":tempArr1, "datasets":tempArr3,});
                })
                .catch((err) => {console.log(err); alert("해당 품목의 도매 정보가 없습니다.");});
        }
        else if(props.data[0] == "연간-소매"){
            axios
                .get(cloudServerIP + "/api/wholesale-and-retail/yearly",
                {
                    params: {
                        kindGradeId: props.data[1],
                    },
                    withCredentials: true
                },)
                .then((res) => {
                    console.log(res);
                    arr = res.data.price[0].item;
                    console.log(arr);
                    for(let i = 0; i < 6; i++){
                        tempArr1 = tempArr1.concat(arr[i].div);
                        tempArr2[0].data = tempArr2[0].data.concat(arr[i].avg_data.replace(/,/gi,""));
                    }
                    console.log(tempArr2);
                    setStatus(res.data.price[1].caption);
                    setData({"labels":tempArr1, "datasets":tempArr2,});
                })
                .catch((err) => {console.log(err); alert("해당 품목의 소매 정보가 없습니다.");});
        }
        else if(props.data[0] == "연간-도매"){
            axios
                .get(cloudServerIP + "/api/wholesale-and-retail/yearly",
                {
                    params: {
                        kindGradeId: props.data[1],
                    },
                    withCredentials: true
                }, )
                .then((res) => {
                    console.log(res);
                    arr = res.data.price[1].item;
                    console.log(arr);
                    for(let i = 0; i < 6; i++){
                        tempArr1 = tempArr1.concat(arr[i].div);
                        tempArr3[0].data = tempArr3[0].data.concat(arr[i].avg_data.replace(/,/gi,""));
                    }
                    console.log(tempArr3);
                    setStatus(res.data.price[0].caption);
                    setData({"labels":tempArr1, "datasets":tempArr3,});
                })
                .catch((err) => {console.log(err); alert("해당 품목의 도매 정보가 없습니다.");});
        }
    }, [props.data]);


    
	return (
    	<div>
             <span style={style4}>{
                status}
             </span>
        	<Line type="line" data={data} options ={options} />
        </div>
    ); 
};
export default LineGraph;