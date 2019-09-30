import 'mocha'
import { assert } from 'chai'
import { equal } from 'assert'
import { generateAndDeployHexo } from '../src/services/article_service'
import config from '../config/index'


describe('generateAndDeployHexo', () => {
  it("generateAndDeployHexo", function () {
    generateAndDeployHexo(config.hexoRoot)
  })
})
