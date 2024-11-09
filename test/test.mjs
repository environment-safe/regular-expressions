/* global describe:false */
import { chai } from '@environment-safe/chai';
import { it } from '@open-automaton/moka';
import { 
    tokenizer as tokenize, 
    RandomExpression,
    Random,
    types 
} from '../src/index.mjs';

const should = chai.should();

//TODO: port test suites
describe('@environment-safe/regular-expressions', ()=>{
    
    describe('Random', ()=>{
        it('generates a deterministic sequence from a static seed', async ()=>{
            const generator = new Random();
            const a = generator.random();
            const b = generator.random();
            const c = generator.random();
            a.should.equal(0.23144008215179881);
            b.should.equal(0.27404636548159655);
            c.should.equal(0.7901279251811976);
        });
    });
    
    describe('tokenizer', ()=>{
        it('tokenizes a simple expression', async ()=>{
            const tokens = tokenize(/foo|bar/.source);
            should.exist(tokens);
            tokens.should.deep.equal({
                'type': types.ROOT,
                'options': [
                    [ 
                        { 'type': types.CHAR, 'value': 102 },
                        { 'type': types.CHAR, 'value': 111 },
                        { 'type': types.CHAR, 'value': 111 } 
                    ], [ 
                        { 'type': types.CHAR, 'value':  98 },
                        { 'type': types.CHAR, 'value':  97 },
                        { 'type': types.CHAR, 'value': 114 } 
                    ]
                ]
            });
        });
    });
    
    describe('generates', ()=>{
        
        it('Returns a correctly generated string', () => {
            let str = new RandomExpression('\\d{4}');
            str.generate().length.should.equal(4);
        });
        
        it('generates a random regular expression', async ()=>{
            const generator = new RandomExpression(/foo|bar|baz/.source);
            const generated = generator.generate();
            generated.length.should.equal(3);
        });
        
        it('generates deterministically', async ()=>{
            const generator = new RandomExpression(/foo|bar|baz/.source);
            generator.randomFn = ()=> 0.25;
            const generatedA = generator.generate();
            generatedA.should.equal('foo');
            generator.randomFn = ()=> 0.35;
            const generatedB = generator.generate();
            generatedB.should.equal('bar');
            generator.randomFn = ()=> 0.75;
            const generatedC = generator.generate();
            generatedC.should.equal('baz');
        });
        
        it('generates deterministically from a seed', async ()=>{
            const generator = new RandomExpression(/foo|bar|baz/.source);
            generator.seed('ctech astronomy');
            const generatedA = generator.generate();
            const generatedB = generator.generate();
            const generatedC = generator.generate();
            generatedA.should.equal('foo');
            generatedB.should.equal('foo');
            generatedC.should.equal('baz');
        });
    });
});

