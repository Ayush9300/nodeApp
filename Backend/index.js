import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config()
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('✅ MongoDB connected');
}).catch((err)=>{
    console.log('❌ MongoDB connection failed:', err.message)
})

const app = express()

// to make input as json
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: ["http://localhost:5174"], credentials: true }))

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})
//import routes
import authRouter from "./routes/auth.route.js"
import noteRouter from "./routes/note.route.js"
// import noteRouter from "./routes/edit.route.js"


app.use("/api/auth",authRouter)
app.use("/api/note",noteRouter)

//error handling 
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Serer Error"

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})