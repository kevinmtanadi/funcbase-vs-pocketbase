# Funcbase vs Pocketbase

This repository is dedicated to test and compare the performance and scalability of two Backend-as-a-Service (BaaS) solutions: **[Funcbase](https://github.com/kevinmtanadi/funcbase)** and **[Pocketbase](https://github.com/pocketbase/pocketbase)**. The goal is to document findings and help developers make informed decisions when choosing a BaaS for their projects.

**Last Test Performed**: 2025/01/15

_test environment_
- Apps deployed using Google Cloud Run on asia-southeast2 (Jakarta) server
- 1 vCPU
- 1 GiB Memory

## Implementation
Both software was tested by running these scenarios
- **Scenario i**: Inserting 10.000 rows of data
- **Scenario ii**: Fetching 50 rows of data, repeated 10.000 times
- **Scenario iii**: Fetch 1 row of data, repeated 10.000 times
- **Scenario iv**: Load testing with e-commerce app simulation

We used [Grafana K6](https://k6.io/) to help running the test

## Result
### Scenario (i)

| Metrics                     | Pocketbase | Funcbase |
|-----------------------------|------------|----------|
| Average response time (ms)  | 404.76     | **304.3** |
| Throughput (req/s)          | 484        | **638**   |
| Error rate (%)              | 4.51       | **0**     |

---

### Scenario (ii)

| Metrics                     | Pocketbase | Funcbase |
|-----------------------------|------------|----------|
| Average response time (ms)  | 1370       | **1010**  |
| Throughput (req/s)          | 143        | **194**   |
| Error rate (%)              | **0**      | **0**     |

---

### Scenario (iii)

| Metrics                     | Pocketbase | Funcbase |
|-----------------------------|------------|----------|
| Average response time (ms)  | 456.3      | **431.58** |
| Throughput (req/s)          | 431        | **458**    |
| Error rate (%)              | **0**      | **0**      |

---

### Scenario (iv)

| Metrics                     | Pocketbase | Funcbase |
|-----------------------------|------------|----------|
| Average response time (ms)  | **592**    | 4040      |
| Throughput (req/s)          | **204**    | 10        |
| Error rate (%)              | 99.17      | **0.41**  |

Here's a video providing the result of the test

https://drive.google.com/file/d/1Q3iRZ1O8_MdGdKq2puIxEG9uty2YRSK1/view?usp=sharing
