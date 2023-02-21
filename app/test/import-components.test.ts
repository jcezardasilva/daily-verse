import {describe , test, expect} from "vitest";

describe('import VerseCard', () => {
    test('component', async () => {
      const cmp = await import('../src/components/VerseCard.vue');
      expect(cmp).toBeDefined()
    })
  })
  