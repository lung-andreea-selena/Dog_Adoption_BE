import express from "express";
import {
  addDog,
  deleteDog,
  getDogById,
  getDogs,
  updateDog,
} from "../controller/DogController";
import {
  addPossession,
  deletePossession,
  getPossessionById,
  getPossessions,
  updatePossession,
} from "../controller/PossessionController";
import {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} from "../controller/UserController";
import { verifyToken, verifyRole } from "../rolecheck";

const router = express.Router();

// Dogs routes
router.get("/dogs", verifyToken, getDogs);
router.get("/dogs/:id", verifyToken, getDogById);
router.post("/dogs", verifyToken, verifyRole(["manager", "admin"]), addDog);
router.put(
  "/dogs/:id",
  verifyToken,
  verifyRole(["manager", "admin"]),
  updateDog
);
router.delete(
  "/dogs/:id",
  verifyToken,
  verifyRole(["manager", "admin"]),
  deleteDog
);

// Possessions routes
router.get("/possessions", verifyToken, getPossessions);
router.get("/possessions/:id", verifyToken, getPossessionById);
router.post(
  "/possessions",
  verifyToken,
  verifyRole(["manager", "admin"]),
  addPossession
);
router.put(
  "/possessions/:id",
  verifyToken,
  verifyRole(["manager", "admin"]),
  updatePossession
);
router.delete(
  "/possessions/:id",
  verifyToken,
  verifyRole(["manager", "admin"]),
  deletePossession
);

// Users routes
router.get("/users", verifyToken, verifyRole(["admin"]), getUsers);
router.get("/users/:id", verifyToken, verifyRole(["admin"]), getUserById);
router.post("/users", verifyToken, verifyRole(["admin"]), addUser);
router.put("/users/:id", verifyToken, verifyRole(["admin"]), updateUser);
router.delete("/users/:id", verifyToken, verifyRole(["admin"]), deleteUser);

export default router;
