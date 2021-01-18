import styled from 'styled-components'


interface InnerAbsoluteProps {
  isOpen: boolean
}

const InnerAbsolute = styled.div<InnerAbsoluteProps>`
  position: absolute;
  z-index: 1;
  border: 1px solid ${props => props.isOpen ? '#333333' : '#E3E3E3'};
  border-radius: 4px;
  width: 100%;
  height: max-content;
`

export default InnerAbsolute