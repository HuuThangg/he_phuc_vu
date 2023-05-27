const express=require("express");
const server= express();
const db =require("./mongoDB");
const port=8080;
server.use(express.static('public')); // Tham chiếu đến thư mục images;

server.get("/dsTivi",(req,res)=>{
    db.getAll("tivi").then(result=>{
        res.json(result);
    })
})

server.get("/dsTivi/:id",(req,res)=>{
    let filter={
        "Ma_so": req.params.id
    }
    db.getOne("tivi",filter).then(result=>{
        res.json(result)
    })
})

server.get("/dsDienthoai",(req,res)=>{
    db.getAll("mobile").then(result=>{
        res.json(result);
    })
})

server.get("/dsNguoidung",(req,res)=>{
    db.getAll("user").then(result=>{
        res.json(result);
    })
})
// Post
// user
server.post("/insertUser",(req,res)=>{
    let noi_dung_nhan=``;
    req.on("data",(dulieu)=>{
        noi_dung_nhan+=dulieu;
    })
    req.on("end",()=>{
        let user=JSON.parse(noi_dung_nhan);
        let ket_qua={
            noi_dung:true
        }
        db.insertOne("user",user).then(result=>{
            console.log(result);
            res.json(ket_qua)
        }).catch(err=>{
            console.log(err);
            ket_qua.noi_dung=false;
            res.json(ket_qua);
        })
    })
})

server.post("/updateUser",(req,res)=>{
    let noi_dung_nhan=``
    let ket_qua={
        noi_dung:true
    }
    req.on("data",(dulieu)=>{
        noi_dung_nhan+= dulieu;

    })
    
    req.on("end",()=>{
        let user=JSON.parse(noi_dung_nhan);
        let filter={
            "Ma_so": user.Ma_so
        }
        let userUpdate={
            "$set":{
                "Ho_ten":user.Ho_ten 
            }
        }
        db.updateOne("user",filter,userUpdate).then(result=>{
            console.log(result);
            res.json(ket_qua);
        }).catch(err=>{
            console.log(err);
            ket_qua.noi_dung=false;
            res.json(ket_qua);
        })
    })
})
server.post("/deleteUser",(req,res)=>{
    let noi_dung_nhan=``;
    let ket_qua={
        noi_dung:true
    }
    req.on("data",(dulieu)=>{
        noi_dung_nhan+= dulieu
    })
    req.on("end",()=>{
        let user=JSON.parse(noi_dung_nhan);
        let filter={
            "Ma_so": user.Ma_so
        }
        db.deleteOne("user",filter).then(result=>{
            console.log(result);
            res.json(ket_qua);
        }).catch(err=>{
            console.log(err);
            ket_qua.noi_dung=false;
            res.json(ket_qua);
        })
    })

})

// Tivi
server.post("/insertTivi",(req,res)=>{
    let noi_dung_nhan=``;
    req.on("data",(dulieu)=>{
        noi_dung_nhan+=dulieu;
    })
    req.on("end",()=>{
        let tivi=JSON.parse(noi_dung_nhan);
        let ket_qua={
            noi_dung:true
        }
        db.insertOne("tivi",tivi).then(result=>{
            console.log(result);
            res.json(ket_qua)
        }).catch(err=>{
            console.log(err);
            ket_qua.noi_dung=false;
            res.json(ket_qua);
        })
    })
})

server.post("/updateTivi",(req,res)=>{
    let noi_dung_nhan=``
    let ket_qua={
        noi_dung:true
    }
    req.on("data",(dulieu)=>{
        noi_dung_nhan+= dulieu;

    })
    
    req.on("end",()=>{
        let tivi=JSON.parse(noi_dung_nhan);
        let filter={
            "Ma_so": tivi.Ma_so
        }
        let userUpdate={
            "$set":{
                "Don_gia_Ban":tivi.Don_gia_Ban 
            }
        }
        db.updateOne("user",filter,userUpdate).then(result=>{
            console.log(result);
            res.json(ket_qua);
        }).catch(err=>{
            console.log(err);
            ket_qua.noi_dung=false;
            res.json(ket_qua);
        })
    })
})
server.post("/deleteTivi",(req,res)=>{
    let noi_dung_nhan=``;
    let ket_qua={
        noi_dung:true
    }
    req.on("data",(dulieu)=>{
        noi_dung_nhan+= dulieu
    })
    req.on("end",()=>{
        let tivi=JSON.parse(noi_dung_nhan);
        let filter={
            "Ma_so": tivi.Ma_so
        }
        db.deleteOne("tivi",filter).then(result=>{
            console.log(result);
            res.json(ket_qua);
        }).catch(err=>{
            console.log(err);
            ket_qua.noi_dung=false;
            res.json(ket_qua);
        })
    })

})

const service= server.listen(port,()=>{
    let host=service.address().address;
    console.log(`Services run ${host}:${port}`);
})



