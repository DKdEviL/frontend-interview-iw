import React from "react";
import styles from "./SingleApplication.module.css";
import cn from "classnames";

const SingleApplication = ({ application }) => {

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0,
    }).format(amount);
  }

  const formatDate = (timeStamp: string): string => {
    return new Date(timeStamp).toLocaleDateString().split('/').join('-');
  }

  return (
    <div className={styles.SingleApplication}>
      <div className={styles.cell}>
        <sub>Company</sub>
        {application.company}
      </div>
      <div className={styles.cell}>
        <sub>Name</sub>
        {application.first_name} {application.last_name}
      </div>
      <div className={cn(styles.cell, styles.email)}>
        <sub>Email</sub>
        {application.email}
      </div>
      <div className={cn(styles.cell, styles.loan_amount)}>
        <sub>Loan Amount</sub>
        {formatCurrency(application.loan_amount)}
      </div>
      <div className={cn(styles.cell, styles.date)}>
        <sub>Application Date</sub>
        {formatDate(application.date_created)}
      </div>
      <div className={cn(styles.cell, styles.date)}>
        <sub>Expiry date</sub>
        {formatDate(application.expiry_date)}
      </div>
    </div>
  );
};

export default SingleApplication;
