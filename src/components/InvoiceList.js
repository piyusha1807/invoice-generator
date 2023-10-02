import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BiShowAlt, BiEditAlt, BiTrash } from "react-icons/bi";
import {deleteInvoice} from '../store/actions/invoiceActions';
import InvoiceModal from './InvoiceModal';

const header = [
  { name: 'Invoice Id', key: 'id' },
  { name: 'Invoice number', key: 'invoiceNumber' },
  { name: 'Due date', key: 'dateOfIssue' },
  { name: 'Bill to', key: 'billTo' },
  { name: 'Bill from', key: 'billFrom' },
  { name: 'Total', key: 'total' },
  { name: 'Actions', key: 'actions' }
];

const InvoiceList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { invoices } = useSelector((state) => state.invoiceReducer);

  const [isOpen, setIsOpen] = useState(false);
  const [viewInvoiceId, setViewInvoiceId] = useState(null);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(invoices.length / itemsPerPage);
  const [currentPage, setCurrentPage] = React.useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInvoices = invoices.slice(startIndex, endIndex);

  const viewInvoice = currentInvoices.find((invoice) => invoice.id === viewInvoiceId);

  const handleView = (id) => {
    setViewInvoiceId(id);
    setIsOpen(true);
  }

  const handleDelete = (id) => {
    const confirmed = window.confirm(`Are you sure you want to permanently delete Invoice id: ${id}?`);
    if(confirmed) {
      dispatch(deleteInvoice(id));
    }
  }

  return (
    <Container>
       <Row className="my-3">
        <Col>
          <h2>Invoice List</h2>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button variant="primary" className="d-block" onClick={() => navigate('form')}>Create New Invoice</Button>
        </Col>
      </Row>
      <Card className="p-4 p-xl-5 my-3 my-xl-4">
          <Table style={{ minHeight: '200px' }} responsive>
            <thead>
              <tr>
                {header.map((item) => (
                  <th key={item.key}>{item.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentInvoices.length == 0 && (
                <tr>
                  <td colSpan={header.length}>
                    <div className="d-flex flex-column align-items-center w-100" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>No invoices added</div>
                  </td>
              </tr>
              )}
              {currentInvoices.map((invoice, index) => {
                return (
                  <tr key={index}>
                    {header.map((item) => {
                      if (item.key === 'actions') {
                        return (
                          <td key={item.key}>
                            <div className="d-flex justify-content-flex-start gap-1">
                            <BiShowAlt style={{height: '23px', width: '23px', padding: '4.5px'}} className="text-white btn btn-primary" onClick={() => handleView(invoice.id)} />
                            <BiEditAlt style={{height: '23px', width: '23px', padding: '4.5px'}} className="text-white btn btn-primary"  onClick={() => navigate(`form/edit/${invoice.id}`)}/>
                            <BiTrash style={{height: '23px', width: '23px', padding: '4.5px'}} className="text-white btn btn-danger" onClick={() => handleDelete(invoice.id)}/>
                            </div>
                          </td>);
                      }

                      return (
                        <td key={item.key}>
                          {invoice[item.key]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        
      {invoices.length > itemsPerPage && (
      <Row>
        <Col>
          <Pagination>
            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </Col>
      </Row>
      )}
      </Card>
      {isOpen && (
        <InvoiceModal showModal={isOpen} closeModal={()=>setIsOpen(false)} info={viewInvoice} items={viewInvoice?.items} currency={viewInvoice?.currency} subTotal={viewInvoice?.subTotal} taxAmmount={viewInvoice?.taxAmmount} discountAmmount={viewInvoice?.discountAmmount} total={viewInvoice?.total} type="view" />
      )}
    </Container>
  );
};

export default InvoiceList;
