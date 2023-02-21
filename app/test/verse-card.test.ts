import {describe , it, expect} from "vitest";
import { mount } from '@vue/test-utils'

import VerseCard from "../src/components/VerseCard.vue";

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
    readText: () => "Devocional Cafezinhos"
  },
});

describe("VerseCard",()=>{
  it('should mount the component applying props', async () => {
      expect(VerseCard).toBeDefined();
    
      const wrapper = mount(VerseCard, {
        props: {
          text: "text",
          source: "source",
          date: new Date()
        },
      })
      expect(wrapper.get(".verse-text").text()).toContain("text");
      expect(wrapper.get(".verse-source").text()).toContain("source");
    })

    it('should get texts on click elements', async () => {
        expect(VerseCard).toBeDefined();
      
        const wrapper = mount(VerseCard, {
          props: {
            text: "text",
            source: "source",
            date: new Date()
          },
        })
        wrapper.get(".verse-title").trigger("click");
        expect(navigator.clipboard.readText()).toContain("Devocional Cafezinho");
    })
})