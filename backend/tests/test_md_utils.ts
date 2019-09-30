import 'mocha'
import { assert } from 'chai'
import { generateAndDeployHexo } from '../src/utils/md_utils'
import { equal } from 'assert'


describe('generateAndDeployHexo', () => {
  it("generateAndDeployHexo", function () {
  generateAndDeployHexo('/home/zayfen/Github/hexo')
  })
})
