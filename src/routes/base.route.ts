import { Router } from "express";
import PackageJson from '../../package.json';

export const baseRoutes = Router();

baseRoutes.get('/', (_, res) =>{
    const {name, version, description, author} = PackageJson;

    res.status(200).json({name, version, description, author});
});