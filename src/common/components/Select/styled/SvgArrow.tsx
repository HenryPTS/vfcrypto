import styled from 'styled-components'

type SvgArrowProps = {
  isOpen: boolean
}

const SvgArrow = styled.svg<SvgArrowProps>`
  position: absolute;
  right: 10px;
  top: 18px;
  ${props => props.isOpen ? `
    transform: rotate(180deg);
    color: #333333;
  ` : `
    color: #DDDDDD;
  `}
  & > path {
    fill: currentColor;
  }
`

export default SvgArrow