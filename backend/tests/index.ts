import * as fs from 'fs'
import * as path from 'path'

import { resolveRoutes } from '../src/core/router_resolver'


let routes = resolveRoutes(path.resolve(__dirname, '../src/controller/index/index.ts'))
console.log("routes: ", routes)
