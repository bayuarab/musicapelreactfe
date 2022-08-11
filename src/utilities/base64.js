import { Card, Container } from "@mui/material";
import React, { useState } from "react";

export default function Base64Image() {
  const [file, setFile] = useState();
  const [imagePreview, setImagePreview] = useState("");
  const [base64, setBase64] = useState();
  const [name, setName] = useState();
  const [size, setSize] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) => {
    console.log("file", e.target.files[0]);
    let file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = _handleReaderLoaded;
      reader.readAsBinaryString(file);
    }
  };

  const _handleReaderLoaded = (readerEvt) => {
    let binaryString = readerEvt.target.result;
    setBase64(btoa(binaryString));
  };

  const onFileSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    console.log(base64);

    setIsLoading(false);
  };

  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    console.log("reader", reader);
    console.log("file", file);
    if (reader !== undefined && file !== undefined) {
      reader.onloadend = () => {
        setFile(file);
        setSize(file.size);
        setName(file.name);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const remove = () => {
    setFile("");
    setImagePreview("");
    setBase64("");
    setName("");
    setSize("");
  };

  return (
    <Container>
      <form onSubmit={(e) => onFileSubmit(e)} onChange={(e) => onChange(e)}>
        <Card
          width={imagePreview === "" ? 310 : 310}
          height={imagePreview === "" ? 400 : 480}
        >
          <Card
            top={imagePreview === "" ? 0 : -140}
            width={imagePreview === "" ? 120 : 145}
            height={imagePreview === "" ? 120 : 145}
          >
            {imagePreview === "" ? (
              ""
            ) : (
              <img src={imagePreview} alt="Icone adicionar" />
            )}
            <input
              type="file"
              name="avatar"
              id="file"
              accept=".jpef, .png, .jpg"
              onChange={photoUpload}
              src={imagePreview}
            />
          </Card>

          {imagePreview !== "" && (
            <>
              <section>
                <label>Nome</label>
                <span>{name}</span>

                <label>Tamanho</label>
                <span>{size}</span>
              </section>

              <button type="submit">{isLoading ? <></> : <>Salvar</>}</button>
              <button type="button" onClick={remove}>
                Remover
              </button>
            </>
          )}
        </Card>
      </form>
    </Container>
  );
}
