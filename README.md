# React MathJax
React component to display math formulas written in AsciiMath | TeX | MathML.

## Usage

```jsx
const MathJax = require('@matejmazur/react-mathjax')
const ascii = 'U = 1/(R_(si) + sum_(i=1)^n(s_n/lambda_n) + R_(se))'
const tex = `f(x) = \\int_{-\\infty}^\\infty\\hat f(\\xi)\\,e^{2 \\pi i \\xi x}\\,d\\xi`

module.exports = () => {
    return (
        <div>
            <MathJax.Context>
                <div>
                    This is an inline math formula: <MathJax.Node inline>{'a = b'}</MathJax.Node>
                    And a block one:

                    <MathJax.Node>{ascii}</MathJax.Node>
                </div>
            </MathJax.Context>
            
            <MathJax.Context input='tex'>
                <div>
                    This is an inline math formula: <MathJax.Node inline>{'a = b'}</MathJax.Node>
                    And a block one:

                    <MathJax.Node>{tex}</MathJax.Node>
                </div>
            </MathJax.Context>
        </div>
    );
}
```

## API

### `MathJax.Context` props

#### `script` (String)
- Loads specified link with MathJax library.
- Default: `https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_CHTML`

#### `input` (String)
- Sets type of input.
- Options: `tex` | `ascii` | `ml`
- Default: `ascii`

#### `options` (Object)
- Sets [MathJax configuration](http://docs.mathjax.org/en/latest/options/index.html?highlight=hub.config#configuration-objects). 
- Default: Official MathJax configuration

## Acknowledgements
- This project was forked from [SamyPesse](https://github.com/SamyPesse) ([react-mathjax](https://github.com/SamyPesse/react-mathjax)).