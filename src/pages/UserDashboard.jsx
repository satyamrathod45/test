import React,{useEffect,useState} from "react";
import api from "../services/api";

const UserDashboard = ()=>{

const [user,setUser] = useState(null);
const [rank,setRank] = useState(null);
const [leaderboard,setLeaderboard] = useState([]);

useEffect(()=>{

fetchData();

},[]);


const fetchData = async()=>{

try{

const userRes = await api.get("/auth/me");
// const rankRes = await api.get("/user/rank");
const leaderboardRes = await api.get("/donor/leaderboard");

setUser(userRes.data.user);
setRank(10);
setLeaderboard(leaderboardRes.data.users);

}catch(err){
console.log(err);
}

};


return(

<div className="min-h-screen bg-gray-100 p-10">

<h1 className="text-4xl font-bold text-center mb-8">
🏆 Donor Dashboard
</h1>


{/* STATS */}

<div className="grid md:grid-cols-4 gap-6 mb-10">

<div className="bg-white p-6 rounded-xl shadow text-center">
<h2 className="text-2xl font-bold">{user?.totalDonations}</h2>
<p>Total Donations 🩸</p>
</div>

<div className="bg-white p-6 rounded-xl shadow text-center">
<h2 className="text-2xl font-bold">{user?.rating || 5}</h2>
<p>Rating ⭐</p>
</div>

<div className="bg-white p-6 rounded-xl shadow text-center">
<h2 className="text-2xl font-bold">#{rank}</h2>
<p>Leaderboard Rank 🏆</p>
</div>

<div className="bg-white p-6 rounded-xl shadow text-center">
<h2 className="text-2xl font-bold">{user?.rewardPoints}</h2>
<p>Reward Points 🎁</p>
</div>

</div>


{/* BADGES */}

<div className="bg-white p-6 rounded-xl shadow mb-10">

<h2 className="text-xl font-bold mb-4">🏅 Achievements</h2>

<div className="flex gap-4">
{user?.totalDonations === 0 && <span className="bg-red-200 px-3 py-1 rounded">No Achivement Yet</span>}

{user?.totalDonations >= 1 && <span className="bg-green-200 px-3 py-1 rounded">First Blood 🩸</span>}
{user?.totalDonations >= 5 && <span className="bg-blue-200 px-3 py-1 rounded">Lifesaver 💙</span>}
{user?.totalDonations >= 10 && <span className="bg-yellow-200 px-3 py-1 rounded">Hero 🏆</span>}

</div>

</div>


{/* LEADERBOARD */}

<div className="bg-white p-6 rounded-xl shadow">

<h2 className="text-xl font-bold mb-4">🔥 Leaderboard</h2>

<div className="space-y-3">

{leaderboard.map((u,index)=>(

<div
key={u._id}
className={`flex justify-between p-3 rounded-lg ${
index===0?"bg-yellow-100":
index===1?"bg-gray-200":
index===2?"bg-orange-200":"bg-gray-50"
}`}
>

<span>
#{index+1} {u.fullName}
</span>

<span>
🩸 {u.totalDonations}
</span>

</div>

))}

</div>

</div>

</div>

);

};

export default UserDashboard;